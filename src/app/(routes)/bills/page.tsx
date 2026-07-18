"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { showToast } from "@/components/ui/alert";
import DesktopOnly from "@/components/ui/desktop-only";
import { useDeviceType } from "@/hooks/useDeviceType";

import {
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  Button,
  Checkbox,
  Avatar,
  Skeleton,
  Pagination,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { green, red, blue, orange, grey } from "@mui/material/colors";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

interface Bill {
  id: string;
  bill_number: string;
  farmer_id: string;
  product_id: string;
  session_id: string;
  total_quantity: number;
  gross_amount: number;
  commission_rate: number;
  commission_amount: number;
  net_payable: number;
  payment_status: "UNPAID" | "PAID";
  payment_method?: string;
  payment_date?: string;
  created_at: string;
  farmer: {
    name: string;
    village: string;
  };
  product: {
    name: string;
  };
  _count: {
    auction_items: number;
  };
}

interface BillResponse {
  success: boolean;
  data: Bill[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface BillOverview {
  overview: {
    total_bills: number;
    paid_bills: number;
    unpaid_bills: number;
    total_billed_amount: number;
    paid_amount: number;
    unpaid_billed_amount: number;
    total_commission_earned: number;
    payment_rate: number;
    avg_bill_amount: number;
    unbilled_items_count: number;
    unbilled_estimated_value: number;
  };
}

type Accent = "slate" | "green" | "red" | "blue" | "orange";

const ACCENTS: Record<Accent, { bg: string; fg: string; border?: string }> = {
  slate: { bg: grey[100], fg: grey[700] },
  green: { bg: green[50], fg: green[700] },
  red: { bg: red[50], fg: red[700] },
  blue: { bg: blue[50], fg: blue[700] },
  orange: { bg: orange[50], fg: orange[700], border: orange[200] },
};

function StatCard({
  icon,
  label,
  value,
  helper,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  helper?: React.ReactNode;
  accent: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: a.border ?? "divider",
        bgcolor: a.border ? a.bg : "background.paper",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ fontWeight: 500 }}
            >
              {label}
            </Typography>
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 700,
                mt: 0.5,
                color: a.fg,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1.2,
              }}
            >
              {value}
            </Typography>
            {helper && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.25 }}
              >
                {helper}
              </Typography>
            )}
          </Box>
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: a.bg,
              color: a.fg,
              width: 38,
              height: 38,
              flexShrink: 0,
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent sx={{ p: 2.25 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Box sx={{ width: "70%" }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" height={32} />
          </Box>
          <Skeleton variant="rounded" width={38} height={38} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function PaymentStatusChip({ status }: { status: string }) {
  if (status === "PAID") {
    return (
      <Chip
        icon={<CheckCircleRoundedIcon sx={{ fontSize: 16 }} />}
        label="Paid"
        size="small"
        sx={{
          bgcolor: green[50],
          color: green[800],
          fontWeight: 600,
          "& .MuiChip-icon": { color: green[600] },
        }}
      />
    );
  }
  if (status === "UNPAID") {
    return (
      <Chip
        icon={<CancelRoundedIcon sx={{ fontSize: 16 }} />}
        label="Unpaid"
        size="small"
        sx={{
          bgcolor: red[50],
          color: red[800],
          fontWeight: 600,
          "& .MuiChip-icon": { color: red[600] },
        }}
      />
    );
  }
  return <Chip label={status} size="small" variant="outlined" />;
}

function BillRow({
  bill,
  selected,
  onSelect,
  onMarkPaid,
  onView,
  isMarking,
  formatCurrency,
  formatDate,
}: {
  bill: Bill;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onMarkPaid: (id: string) => void;
  onView: (id: string) => void;
  isMarking: boolean;
  formatCurrency: (n: number) => string;
  formatDate: (d: string) => string;
}) {
  const isPaid = bill.payment_status === "PAID";

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        display: "flex",
        alignItems: "flex-start",
        gap: { xs: 1.25, sm: 2 },
        "&:hover": { bgcolor: grey[50] },
        transition: "background-color 0.15s ease",
      }}
    >
      {!isPaid && (
        <Checkbox
          size="small"
          checked={selected}
          onChange={(e) => onSelect(bill.id, e.target.checked)}
          sx={{ mt: 0.25, flexShrink: 0 }}
        />
      )}

      <Avatar
        variant="rounded"
        sx={{
          bgcolor: isPaid ? green[50] : red[50],
          color: isPaid ? green[600] : red[600],
          width: 40,
          height: 40,
          flexShrink: 0,
          display: { xs: "none", sm: "flex" },
        }}
      >
        {isPaid ? (
          <CheckCircleRoundedIcon fontSize="small" />
        ) : (
          <CancelRoundedIcon fontSize="small" />
        )}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ alignItems: { sm: "center" } }}
        >
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
          >
            {bill.bill_number}
          </Typography>
          <PaymentStatusChip status={bill.payment_status} />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0.5, sm: 3 }}
          sx={{ mt: 0.75, color: "text.secondary" }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ minWidth: 0, alignItems: "center" }}
          >
            <GroupsRoundedIcon sx={{ fontSize: 16, flexShrink: 0 }} />
            <Typography variant="body2" noWrap>
              {bill.farmer.name}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ minWidth: 0, alignItems: "center" }}
          >
            <Inventory2RoundedIcon sx={{ fontSize: 16, flexShrink: 0 }} />
            <Typography variant="body2" noWrap>
              {bill.product.name}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ minWidth: 0, alignItems: "center" }}
          >
            <CalendarTodayRoundedIcon sx={{ fontSize: 15, flexShrink: 0 }} />
            <Typography variant="body2" noWrap>
              {formatDate(bill.created_at)}
            </Typography>
          </Stack>
        </Stack>

        <Box
          sx={{
            mt: 1.25,
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            rowGap: 0.75,
            columnGap: 2,
            maxWidth: { sm: 420 },
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Gross
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
            >
              {formatCurrency(bill.gross_amount)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Commission
            </Typography>
            <Typography
              variant="body2"
              color={blue[700]}
              sx={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
            >
              {formatCurrency(bill.commission_amount)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Net payable
            </Typography>
            <Typography
              variant="body2"
              color={green[700]}
              sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
            >
              {formatCurrency(bill.net_payable)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Items
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {bill._count.auction_items}
            </Typography>
          </Box>
        </Box>

        {bill.payment_date && (
          <Typography
            variant="caption"
            color={green[700]}
            sx={{ mt: 1, display: "block" }}
          >
            Paid on {formatDate(bill.payment_date)} via {bill.payment_method}
          </Typography>
        )}
      </Box>

      <Stack spacing={1} sx={{ flexShrink: 0, alignItems: "flex-end" }}>
        {!isPaid && (
          <Button
            size="small"
            variant="contained"
            color="success"
            disableElevation
            onClick={() => onMarkPaid(bill.id)}
            disabled={isMarking}
            startIcon={
              isMarking ? (
                <CircularProgress size={14} color="inherit" />
              ) : (
                <CreditCardRoundedIcon />
              )
            }
            sx={{
              textTransform: "none",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {isMarking ? "Processing…" : "Mark paid"}
          </Button>
        )}
        <Button
          size="small"
          variant="outlined"
          onClick={() => onView(bill.id)}
          startIcon={<VisibilityRoundedIcon />}
          sx={{ textTransform: "none", fontWeight: 600, whiteSpace: "nowrap" }}
        >
          View
        </Button>
      </Stack>
    </Box>
  );
}

function BillRowSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, sm: 2.5 }, display: "flex", gap: 2 }}>
      <Skeleton
        variant="rounded"
        width={40}
        height={40}
        sx={{ display: { xs: "none", sm: "block" } }}
      />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="30%" height={28} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </Box>
    </Box>
  );
}

export default function BillsPage() {
  const router = useRouter();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const deviceType = useDeviceType();

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBills, setTotalBills] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PAID" | "UNPAID">(
    "ALL",
  );
  const [searchLoading, setSearchLoading] = useState(false);
  const [markingPaid, setMarkingPaid] = useState<string | null>(null);
  const [overview, setOverview] = useState<BillOverview | null>(null);

  const [selectedBills, setSelectedBills] = useState<Set<string>>(new Set());
  const [markingMultiplePaid, setMarkingMultiplePaid] = useState(false);

  const fetchBills = async (page = 1, search = "", status?: string) => {
    // Delay state update to the next microtask to prevent sync setState in useEffect warnings
    await Promise.resolve();
    setLoading(page === 1);
    setSearchLoading(search !== "");

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        sortBy: "created_at",
        ...(search && { farmer_name: search }),
        ...(status && status !== "ALL" && { payment_status: status }),
      });

      const response = await fetch(`/api/bills?${params}`);
      if (response.ok) {
        const data: BillResponse = await response.json();
        setBills(data.data);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
        setTotalBills(data.meta.total);
      }
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await fetch("/api/bills/overview");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOverview(data.data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch overview:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBills();
      await fetchOverview();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchBills(1, value, statusFilter === "ALL" ? undefined : statusFilter);
  };

  const handlePageChange = (page: number) => {
    fetchBills(
      page,
      searchTerm,
      statusFilter === "ALL" ? undefined : statusFilter,
    );
  };

  const handleStatusFilter = (status: "ALL" | "PAID" | "UNPAID") => {
    setStatusFilter(status);
    fetchBills(1, searchTerm, status === "ALL" ? undefined : status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleMarkAsPaid = async (billId: string) => {
    setMarkingPaid(billId);
    try {
      const response = await fetch("/api/bills/pay-multiple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bill_ids: [billId],
          payment_method: "cash",
          notes: "Marked as paid from bills list",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchBills(
            currentPage,
            searchTerm,
            statusFilter === "ALL" ? undefined : statusFilter,
          );
          showToast("Bill marked as paid successfully!");
        } else {
          showToast(
            `Failed to mark bill as paid: ${data.message || "Unknown error"}`,
          );
        }
      } else {
        const errorData = await response.json().catch(() => null);
        const message =
          (errorData && (errorData.error?.message || errorData.message)) ||
          `HTTP ${response.status}`;
        showToast(`Failed to mark bill as paid: ${message}`);
      }
    } catch (error) {
      console.error("Failed to mark bill as paid:", error);
      showToast("Failed to mark bill as paid. Please try again.");
    } finally {
      setMarkingPaid(null);
    }
  };

  const handleBillSelection = (billId: string, checked: boolean) => {
    const newSelected = new Set(selectedBills);
    if (checked) {
      newSelected.add(billId);
    } else {
      newSelected.delete(billId);
    }
    setSelectedBills(newSelected);
  };

  const unpaidBills = bills.filter((bill) => bill.payment_status === "UNPAID");

  const handleSelectAll = () => {
    if (selectedBills.size === unpaidBills.length) {
      setSelectedBills(new Set());
    } else {
      setSelectedBills(new Set(unpaidBills.map((bill) => bill.id)));
    }
  };

  const handleMarkMultiplePaid = async () => {
    if (selectedBills.size === 0) {
      showToast("Please select bills to mark as paid");
      return;
    }
    setMarkingMultiplePaid(true);
    try {
      const response = await fetch("/api/bills/pay-multiple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bill_ids: Array.from(selectedBills),
          payment_method: "cash",
          notes: "Multiple bills marked as paid from bills list",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSelectedBills(new Set());
          await fetchBills(
            currentPage,
            searchTerm,
            statusFilter === "ALL" ? undefined : statusFilter,
          );
          showToast(`${selectedBills.size} bills marked as paid successfully!`);
        } else {
          showToast(
            `Failed to mark bills as paid: ${data.message || "Unknown error"}`,
          );
        }
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        showToast(`Failed to mark bills as paid: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to mark multiple bills as paid:", error);
      showToast("Failed to mark bills as paid. Please try again.");
    } finally {
      setMarkingMultiplePaid(false);
    }
  };

  const totalPaidAmount = bills
    .filter((b) => b.payment_status === "PAID")
    .reduce((sum, b) => sum + b.net_payable, 0);
  const totalUnpaidAmount = bills
    .filter((b) => b.payment_status === "UNPAID")
    .reduce((sum, b) => sum + b.net_payable, 0);
  const totalCommission = bills.reduce(
    (sum, b) => sum + b.commission_amount,
    0,
  );

  const showMobileBanner = deviceType === "mobile" || deviceType === "tablet";
  const showBulkBar = bills.some((b) => b.payment_status === "UNPAID");

  return (
    <DashboardLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2.5, sm: 3 },
          minWidth: 0,
        }}
      >
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Box>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              Bills &amp; Payments
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage farmer bills and payment tracking
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1.25}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <DesktopOnly message="Bill generation requires desktop access for accurate data entry and management.">
              <Button
                variant="contained"
                disableElevation
                startIcon={<DescriptionRoundedIcon />}
                onClick={() => router.push("/bills/preview")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  flex: { xs: 1, sm: "initial" },
                }}
              >
                {isXs ? "Generate" : "Generate Bills"}
              </Button>
            </DesktopOnly>
            <Button
              variant="outlined"
              startIcon={<CreditCardRoundedIcon />}
              onClick={() => router.push("/bills/payments")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                flex: { xs: 1, sm: "initial" },
              }}
            >
              {isXs ? "Pay" : "Payments"}
            </Button>
          </Stack>
        </Stack>

        {/* Mobile info banner */}
        {showMobileBanner && (
          <Card
            variant="outlined"
            sx={{ borderRadius: 3, bgcolor: blue[50], borderColor: blue[100] }}
          >
            <CardContent
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "flex-start",
                "&:last-child": { pb: 2 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: blue[100],
                  color: blue[700],
                  width: 36,
                  height: 36,
                }}
              >
                <DescriptionRoundedIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle2"
                  color={blue[900]}
                  sx={{ fontWeight: 700 }}
                >
                  Mobile &amp; tablet access
                </Typography>
                <Typography variant="body2" color={blue[800]} sx={{ mt: 0.25 }}>
                  You can view and select bills here, but generating bills and
                  processing payments needs a desktop for security and accuracy.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 2,
          }}
        >
          {!overview && loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                accent="slate"
                icon={<ReceiptLongRoundedIcon fontSize="small" />}
                label="Total bills"
                value={overview?.overview?.total_bills ?? totalBills}
              />
              <StatCard
                accent="green"
                icon={<CheckCircleRoundedIcon fontSize="small" />}
                label="Paid amount"
                value={formatCurrency(
                  overview?.overview?.paid_amount ?? totalPaidAmount,
                )}
                helper={`${overview?.overview?.paid_bills ??
                  bills.filter((b) => b.payment_status === "PAID").length
                  } bills paid`}
              />
              <StatCard
                accent="red"
                icon={<CancelRoundedIcon fontSize="small" />}
                label="Pending amount"
                value={formatCurrency(
                  overview?.overview?.unpaid_billed_amount ?? totalUnpaidAmount,
                )}
                helper={`${overview?.overview?.unpaid_bills ??
                  bills.filter((b) => b.payment_status === "UNPAID").length
                  } bills pending`}
              />
              <StatCard
                accent="blue"
                icon={<CurrencyRupeeRoundedIcon fontSize="small" />}
                label="Commission earned"
                value={formatCurrency(
                  overview?.overview?.total_commission_earned ??
                  totalCommission,
                )}
              />
              <StatCard
                accent="orange"
                icon={<WarningAmberRoundedIcon fontSize="small" />}
                label="Items not billed"
                value={overview?.overview?.unbilled_items_count ?? 0}
                helper={`Worth ${formatCurrency(overview?.overview?.unbilled_estimated_value ?? 0)}`}
              />
            </>
          )}
        </Box>

        {/* Filters + search */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Tabs
            value={statusFilter}
            onChange={(_, value) => handleStatusFilter(value)}
            sx={{
              minHeight: 40,
              "& .MuiTab-root": {
                minHeight: 40,
                textTransform: "none",
                fontWeight: 600,
                px: 1.75,
              },
            }}
          >
            <Tab label="All bills" value="ALL" />
            <Tab label="Paid" value="PAID" />
            <Tab label="Unpaid" value="UNPAID" />
          </Tabs>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <TextField
              placeholder="Search farmer…"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              size="small"
              variant="outlined"
              sx={{ width: { xs: "100%", sm: 240 } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon
                        fontSize="small"
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: searchLoading ? (
                    <InputAdornment position="end">
                      <CircularProgress size={16} />
                    </InputAdornment>
                  ) : undefined,
                },
              }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                fetchBills(
                  currentPage,
                  searchTerm,
                  statusFilter === "ALL" ? undefined : statusFilter,
                )
              }
              sx={{ minWidth: 0, px: 1.25, flexShrink: 0 }}
            >
              <RefreshRoundedIcon fontSize="small" />
            </Button>
          </Stack>
        </Stack>

        {/* Bulk actions */}
        {showBulkBar && (
          <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: grey[50] }}>
            <CardContent
              sx={{
                p: { xs: 1.5, sm: 2 },
                "&:last-child": { pb: { xs: 1.5, sm: 2 } },
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                justifyContent: "space-between",
                gap: 1.5,
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ alignItems: { sm: "center" } }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <Checkbox
                    size="small"
                    checked={
                      selectedBills.size > 0 &&
                      selectedBills.size === unpaidBills.length
                    }
                    indeterminate={
                      selectedBills.size > 0 &&
                      selectedBills.size < unpaidBills.length
                    }
                    onChange={handleSelectAll}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Select all unpaid ({unpaidBills.length})
                  </Typography>
                </Stack>
                {selectedBills.size > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    {selectedBills.size} bill{selectedBills.size > 1 ? "s" : ""}{" "}
                    selected
                  </Typography>
                )}
              </Stack>

              {selectedBills.size > 0 && (
                <DesktopOnly message="Payment processing requires desktop access for secure transactions.">
                  <Button
                    onClick={handleMarkMultiplePaid}
                    disabled={markingMultiplePaid}
                    variant="contained"
                    color="success"
                    disableElevation
                    startIcon={
                      markingMultiplePaid ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <CreditCardRoundedIcon />
                      )
                    }
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    {markingMultiplePaid
                      ? "Processing…"
                      : `Mark ${selectedBills.size} bill${selectedBills.size > 1 ? "s" : ""} as paid`}
                  </Button>
                </DesktopOnly>
              )}
            </CardContent>
          </Card>
        )}

        {/* Bills list */}
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <Box sx={{ p: { xs: 2, sm: 2.5 }, pb: 1.5 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <ReceiptLongRoundedIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Bills list
              </Typography>
            </Stack>
          </Box>
          <Divider />

          {loading ? (
            <Box>
              {[0, 1, 2].map((i) => (
                <Box key={i}>
                  <BillRowSkeleton />
                  {i < 2 && <Divider />}
                </Box>
              ))}
            </Box>
          ) : bills.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8, px: 3 }}>
              <Avatar
                sx={{
                  bgcolor: grey[100],
                  color: grey[500],
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <InboxRoundedIcon />
              </Avatar>
              <Typography
                variant="subtitle1"
                color="text.primary"
                sx={{ fontWeight: 600 }}
              >
                {searchTerm || statusFilter !== "ALL"
                  ? "No bills match your filters"
                  : "No bills yet"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {searchTerm || statusFilter !== "ALL"
                  ? "Try a different farmer name or clear the status filter."
                  : "Generate your first bill to see it here."}
              </Typography>
            </Box>
          ) : (
            <Box>
              {bills.map((bill, index) => (
                <Box key={bill.id}>
                  <BillRow
                    bill={bill}
                    selected={selectedBills.has(bill.id)}
                    onSelect={handleBillSelection}
                    onMarkPaid={handleMarkAsPaid}
                    onView={(id) => router.push(`/bills/${id}`)}
                    isMarking={markingPaid === bill.id}
                    formatCurrency={formatCurrency}
                    formatDate={formatDate}
                  />
                  {index < bills.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          )}
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="body2" color="text.secondary">
              Showing {(currentPage - 1) * 10 + 1} to{" "}
              {Math.min(currentPage * 10, totalBills)} of {totalBills} bills
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => handlePageChange(page)}
              color="primary"
              size={isXs ? "small" : "medium"}
              shape="rounded"
            />
          </Stack>
        )}
      </Box>
    </DashboardLayout>
  );
}
