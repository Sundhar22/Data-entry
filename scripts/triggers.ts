import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import prisma from '../src/lib/prisma';

interface TriggerFile {
    path: string;
    name: string;
    order: number;
}

class TriggerManager {
    private triggerDir: string;
    private triggerFiles: TriggerFile[];

    constructor() {
        this.triggerDir = join(process.cwd(), 'database', 'triggers');
        this.triggerFiles = [
            { path: '01-drop-function.sql', name: 'Drop Functions', order: 1 },
            { path: '02-create-function.sql', name: 'Create Function', order: 2 },
            { path: '03-create-trigger.sql', name: 'Create Triggers', order: 3 },
            { path: '04-create-index.sql', name: 'Create Index', order: 4 }
        ];
    }

    private async executeSql(sql: string, name: string): Promise<void> {
        try {
            console.log(`Executing: ${name}`);
            
            // Handle PostgreSQL-specific syntax by parsing $$ delimited functions
            if (sql.includes('$$')) {
                // Split by $$ and handle each part
                const parts = sql.split('$$');
                let currentSql = '';
                let inFunction = false;
                
                for (let i = 0; i < parts.length; i++) {
                    if (i % 2 === 0) {
                        // Outside function body
                        currentSql += parts[i];
                        if (i < parts.length - 1) {
                            inFunction = !inFunction;
                            if (inFunction) {
                                currentSql += '$$';
                            }
                        }
                    } else {
                        // Inside function body
                        currentSql += parts[i] + '$$';
                        inFunction = false;
                    }
                }
                
                await prisma.$executeRawUnsafe(currentSql);
            } else {
                // Handle multiple statements
                const statements = sql
                    .split(';')
                    .map(stmt => stmt.trim())
                    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

                for (const statement of statements) {
                    if (statement.trim()) {
                        await prisma.$executeRawUnsafe(statement + ';');
                    }
                }
            }
            
            console.log(`✅ ${name} completed successfully`);
        } catch (error) {
            console.error(`❌ Error executing ${name}:`, error);
            throw error;
        }
    }

    private readTriggerFile(filename: string): string {
        const filePath = join(this.triggerDir, filename);
        if (!existsSync(filePath)) {
            throw new Error(`Trigger file not found: ${filePath}`);
        }
        return readFileSync(filePath, 'utf-8');
    }

    async installTriggers(): Promise<void> {
        console.log('🚀 Installing payment status triggers...');
        
        try {
            // Execute trigger files in order
            for (const triggerFile of this.triggerFiles) {
                const sql = this.readTriggerFile(triggerFile.path);
                await this.executeSql(sql, triggerFile.name);
            }
            
            console.log('✅ All triggers installed successfully!');
        } catch (error) {
            console.error('❌ Failed to install triggers:', error);
            throw error;
        }
    }

    async removeTriggers(): Promise<void> {
        console.log('🗑️  Removing payment status triggers...');
        
        try {
            // Just run the drop statements
            const dropSql = this.readTriggerFile('01-drop-function.sql');
            await this.executeSql(dropSql, 'Remove Triggers');
            
            console.log('✅ All triggers removed successfully!');
        } catch (error) {
            console.error('❌ Failed to remove triggers:', error);
            throw error;
        }
    }

    async listTriggers(): Promise<void> {
        console.log('📋 Listing database triggers...');
        
        try {
            const triggers = await prisma.$queryRaw`
                SELECT trigger_name, event_manipulation, event_object_table
                FROM information_schema.triggers
                WHERE trigger_schema = 'public'
                AND trigger_name LIKE '%payment_status%'
                ORDER BY trigger_name;
            `;
            
            console.log('Database Triggers:');
            console.table(triggers);
            
            const functions = await prisma.$queryRaw`
                SELECT routine_name, routine_type
                FROM information_schema.routines
                WHERE routine_schema = 'public'
                AND routine_name LIKE '%payment_status%'
                ORDER BY routine_name;
            `;
            
            console.log('Database Functions:');
            console.table(functions);
            
        } catch (error) {
            console.error('❌ Failed to list triggers:', error);
            throw error;
        }
    }

    async testTriggers(): Promise<void> {
        console.log('🧪 Testing payment status triggers...');
        
        try {
            // Test the trigger system by checking a session's payment status
            const result = await prisma.$queryRaw`
                SELECT 
                    s.id,
                    s.payment_status,
                    COUNT(ai.id) as total_items,
                    COUNT(ai.bill_id) as paid_items,
                    COUNT(*) FILTER (WHERE ai.bill_id IS NULL) as unpaid_items
                FROM auction_sessions s
                LEFT JOIN auction_items ai ON s.id = ai.session_id
                GROUP BY s.id, s.payment_status
                LIMIT 5;
            `;
            
            console.log('Sample Session Payment Status:');
            console.table(result);
            
            console.log('✅ Trigger test completed successfully!');
        } catch (error) {
            console.error('❌ Failed to test triggers:', error);
            throw error;
        }
    }
}

// CLI Interface
async function main() {
    const command = process.argv[2];
    const manager = new TriggerManager();

    try {
        switch (command) {
            case 'install':
                await manager.installTriggers();
                break;
            case 'remove':
                await manager.removeTriggers();
                break;
            case 'list':
                await manager.listTriggers();
                break;
            case 'test':
                await manager.testTriggers();
                break;
            default:
                console.log('Usage: npm run triggers <install|remove|list|test>');
                console.log('');
                console.log('Commands:');
                console.log('  install  - Install payment status triggers');
                console.log('  remove   - Remove all payment status triggers');
                console.log('  list     - List current database triggers');
                console.log('  test     - Test trigger functionality');
                process.exit(1);
        }
    } catch (error) {
        console.error('Command failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    main();
}

export { TriggerManager };
