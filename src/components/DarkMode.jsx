import React, { useEffect, useState } from "react";
import {
  MantineProvider,
  Container,
  Title,
  Switch,
  Group,
} from "@mantine/core";

function DarkMode(props) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    props.fromdarkModetoNavbar(darkMode);
  }, [darkMode]);
  return (
    <MantineProvider
      theme={{
        colorScheme: darkMode ? "dark" : "light",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container>
        <Group position="center" style={{ marginBottom: 20 }}>
          <Switch
            checked={darkMode}
            onChange={(event) => setDarkMode(event.currentTarget.checked)}
            label={darkMode ? "Light Theme" : "Dark Theme"}
          />
        </Group>
      </Container>
    </MantineProvider>
  );
}

export default DarkMode;
