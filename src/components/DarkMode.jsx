import React, { useEffect, useState } from "react";
import { useMantineTheme, rem } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { Container, Switch, Group } from "@mantine/core";
import "../App.css";
function DarkMode(props) {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );
  const theme = useMantineTheme();
  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );
  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );
  const colorSheme = {
    colorScheme: darkMode ? "dark" : "light",
  };
  useEffect(() => {
    props.fromdarkModetoNavbar(darkMode);
  }, [darkMode]);
  return (
    <div
      theme={colorSheme}
      className="darkModeComponent"
      withGlobalStyles
      withNormalizeCSS
    >
      <Container>
        <Group position="center">
          <Switch
            size="lg"
            color={theme.colors.blue[6]}
            onLabel={sunIcon}
            offLabel={moonIcon}
            checked={darkMode}
            onChange={(event) => {
              const isChecked = event.target.checked;
              localStorage.setItem("darkMode", JSON.stringify(isChecked));
              setDarkMode(isChecked);
            }}
          />
        </Group>
      </Container>
    </div>
  );
}

export default DarkMode;
