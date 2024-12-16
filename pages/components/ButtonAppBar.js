import React, { useMemo, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import VideocamIcon from "@material-ui/icons/Videocam";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ExploreIcon from "@material-ui/icons/Explore";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import BlogIcon from "@material-ui/icons/ViewList";
import ShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import {
  Divider,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import useDevice from "../../lib/store/device/useDevice";

const useUserId = () => {
  const userId = useSelector((state) => state.login.userId);
  return [userId];
};

export const links = [
  {
    name: "Next Car Service Prototype",
    link: "https://next-car-service.vercel.app",
    Icon: LocalTaxiIcon,
    scope: "mobile,external",
    image: "/landing/next-car-service.png",
    description:
      "Cyberpunk Cars Service, for next generation vehicles that featured by unmanned, smart, luxury, racing Cyber-Car Systems.  Prototype project, probing 3rd web service including Mapbox GL, Geocoding, Firebase Auth, Stripe Payment.",
  },
  {
    name: "Gatsby-BookExcerpt",
    link: "https://excerpts.gtsb.io/",
    Icon: AccountBalanceIcon,
    scope: "mobile,external",
    image: "/landing/gatsbyBE.PNG",
    description:
      "Gatsby framework + Sanity.io CMS, keeping personal readding books' excerpts",
  },
  {
    name: "Svelte-Media",
    link: "https://svelte-media.vercel.app",
    Icon: ExploreIcon,
    scope: "mobile,external",
    image: "/landing/svelteMD.PNG",
    description:
      "This is a light web app that display latest twitters based on a map location, powered by Svelte template",
  },
  {
    name: "Shoping Cart",
    link: "https://effulgent-yeot-044234.netlify.app",
    Icon: ShoppingCartIcon,
    image: "/landing/tech_shop.png",
    scope: "external",
    description:
      "A simple shopping cart project, using React, Stripe, and Material-UI, boltAI",
  },
  {
    name: "Web-RTC",
    link: "/webrtc",
    Icon: VideocamIcon,
    scope: "web,mobile",
  },
  {
    name: "E-Learn",
    link: "/e-learn-facade",
    Icon: MenuBookIcon,
    scope: "web,mobile",
  },
  {
    name: "Blog",
    link: "/blog",
    Icon: BlogIcon,
    scope: "web,mobile",
  },
  {
    name: "Login",
    link: "/login",
    Icon: PersonOutlineIcon,
    scope: "web,mobile",
  },
];

const Links = ({ iScope = "web" }) => {
  const [userId] = useUserId();
  return (
    <>
      {links
        .filter(({ scope }) => scope.includes(iScope))
        .map(({ Icon, name, link }) => {
          if (/^login$/gi.test(name) && userId) {
            name = userId;
            link += "/profile";
            Icon = AccountCircleIcon;
          }
          const MobileListItem = () => (
            <ListItem button>
              <ListItemIcon>
                <Icon color="primary" />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          );

          const WebListItem = () => {
            return <Button color="inherit">{name}</Button>;
          };

          return iScope === "web" ? (
            <Box pl={1} key={name}>
              {/^https:/.test(link) ? (
                <a
                  href={link}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <WebListItem />
                </a>
              ) : (
                <Link href={link}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <WebListItem />
                  </a>
                </Link>
              )}
            </Box>
          ) : (
            <Box minWidth={240} key={name}>
              {/^https:/.test(link) ? (
                <a href={link} style={{ textDecoration: "none" }}>
                  <MobileListItem />
                </a>
              ) : (
                <Link href={link}>
                  <a>
                    <MobileListItem />
                  </a>
                </Link>
              )}

              <Divider />
            </Box>
          );
        })}
    </>
  );
};

const useWinLayout = () => {
  useDevice();
  const isCompact = useSelector((state) => state.device.window.isCompact);
  return [isCompact];
};

const useDrawer = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback((event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen((o) => !o);
  }, []);

  return [open, toggleDrawer];
};

export function ButtonAppBar() {
  const [isCompact] = useWinLayout();
  const [open, toggleDrawer] = useDrawer();

  const brand = /manfen/gi.test(location.hostname)
    ? "Manfen-Tech"
    : "Yao's Portfolio";

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box ml={2}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Link href="/" replace>
            <Typography
              variant="h6"
              style={{ cursor: "pointer", marginLeft: 16 }}
            >
              {brand}
            </Typography>
          </Link>
          <Box style={{ flexGrow: 1 }} />
          {!isCompact && <Links iScope="web" />}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box
          bgcolor="primary.main"
          color="info.contrastText"
          p={2}
          display="flex"
          alignItems="center"
        >
          <Avatar alt="HadesFlower" src="/logo.jpg" />
          <Box ml={1}>
            <Typography variant="h6">{brand}</Typography>
          </Box>
        </Box>

        <List onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <Links iScope="mobile" />
        </List>
      </Drawer>
    </>
  );
}

export default ButtonAppBar;
