export type AppTheme = {
  dark: boolean;
  colors: {
    bg: string;
    card: string;
    card2: string;
    text: string;
    muted: string;
    border: string;
    primary: string;
    drawerActive: string;
  };
  radius: {
    xl: number;
    lg: number;
    md: number;
  };
};

export const lightTheme: AppTheme = {
  dark: false,
  colors: {
    bg: "#F7F7FA",
    card: "#FFFFFF",
    card2: "#F2F2F7",
    text: "#111118",
    muted: "rgba(17,17,24,0.6)",
    border: "rgba(17,17,24,0.10)",
    primary: "#111118",
    drawerActive: "rgba(17,17,24,0.08)",
  },
  radius: { xl: 24, lg: 18, md: 14 },
};

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    bg: "#0B0B10",
    card: "#111118",
    card2: "rgba(255,255,255,0.06)",
    text: "#FFFFFF",
    muted: "rgba(255,255,255,0.70)",
    border: "rgba(255,255,255,0.10)",
    primary: "#FFFFFF",
    drawerActive: "rgba(255,255,255,0.08)",
  },
  radius: { xl: 24, lg: 18, md: 14 },
};
