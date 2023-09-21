import PropTypes from "prop-types";
// @mui
import { useTheme } from "@mui/material/styles";
import { Stack, AppBar, Toolbar, IconButton, Button } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// hooks
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";
// config
import { HEADER, NAV } from "../../../config-global";
// components
import Logo from "../../../components/logo/LogoFull";
import Iconify from "../../../components/iconify";
import { useSettingsContext } from "../../../components/settings";
//
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
// import ContactsPopover from "./ContactsPopover";
// import NotificationsPopover from "./NotificationsPopover";
// import ModeOptions from "../../../components/settings/drawer/ModeOptions";
import SettingPopover from "./SettingPopover";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "lg");

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;
  // save as PDF
  const handlePrintPDF = () => {
    // Get the DOM element to be printed
    const element = document.getElementById("print-page");

    // Create a canvas from the DOM element
    html2canvas(element, {
      scale: 5,
    }).then((canvas) => {
      // Convert the canvas to an image data URL
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      // Set the image data as the PDF content
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF file
      pdf.save("webpage.pdf");
    });
  };
  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: "text.primary" }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        {/* <NotificationsPopover /> */}
        {/* <ContactsPopover /> */}
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={handlePrintPDF}
        >
          Print to PDF
        </Button>
        <SettingPopover />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
