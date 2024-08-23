import React, { useEffect, useState } from "react";
import { useMantineTheme, rem } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { Container, Switch, Group } from "@mantine/core";

function DarkMode(props) {
  const [darkMode, setDarkMode] = useState(true);
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
  useEffect(() => {
    props.fromdarkModetoNavbar(darkMode);
  }, [darkMode]);
  return (
    <div
      theme={{
        colorScheme: darkMode ? "dark" : "light",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container>
        <Group position="center" style={{ marginLeft: 150 }}>
          <Switch
            size="lg"
            color={theme.colors.blue[6]}
            onLabel={sunIcon}
            offLabel={moonIcon}
            checked={darkMode}
            onChange={(event) => setDarkMode(event.currentTarget.checked)}
          />
        </Group>
      </Container>
    </div>
  );
}

export default DarkMode;
