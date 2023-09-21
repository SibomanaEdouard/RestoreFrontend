import { useState } from "react";
// @mui
import { Stack, Tooltip } from "@mui/material";
// locales
import MenuPopover from "../../../components/menu-popover";
import { IconButtonAnimate } from "../../../components/animate";
import Iconify from "../../../components/iconify/Iconify";

import ModeOptions from "../../../components/settings/drawer/ModeOptions";
import ColorPresetsOptions from "../../../components/settings/drawer/ColorPresetsOptions";
// ----------------------------------------------------------------------

export default function SettingPopover() {

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };


  return (
    <>
      <Tooltip title="Setting">
        <IconButtonAnimate
          onClick={handleOpenPopover}
          sx={{
            width: 40,
            height: 40,
            ...(openPopover && {
              bgcolor: "action.selected",
            }),
          }}
        >
          <Iconify icon="ep:setting" width="24" />
        </IconButtonAnimate>
      </Tooltip>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 180 }}
      >
        <Stack spacing={0.75}>
          <ModeOptions />
          <ColorPresetsOptions />
        </Stack>
      </MenuPopover>
    </>
  );
}
