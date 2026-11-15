import { addIcon } from '@iconify/vue';

// Pre-registered Material Design Icons from @iconify-json/mdi for instant, offline-first rendering
const MDI_ICONS: Record<string, { body: string; width: number; height: number }> = {
  "view-dashboard-outline": {
    "body": "<path fill=\"currentColor\" d=\"M19 5v2h-4V5zM9 5v6H5V5zm10 8v6h-4v-6zM9 17v2H5v-2zM21 3h-8v6h8zM11 3H3v10h8zm10 8h-8v10h8zm-10 4H3v6h8z\"/>",
    "width": 24,
    "height": 24
  },
  "clipboard-check-outline": {
    "body": "<path fill=\"currentColor\" d=\"M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-7 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1M7 7h10V5h2v14H5V5h2zm.5 6.5L9 12l2 2l4.5-4.5L17 11l-6 6z\"/>",
    "width": 24,
    "height": 24
  },
  "format-list-bulleted": {
    "body": "<path fill=\"currentColor\" d=\"M7 5h14v2H7zm0 8v-2h14v2zM4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5m0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5M7 19v-2h14v2zm-3-2.5A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5\"/>",
    "width": 24,
    "height": 24
  },
  "plus-circle-outline": {
    "body": "<path fill=\"currentColor\" d=\"M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4z\"/>",
    "width": 24,
    "height": 24
  },
  "plus": {
    "body": "<path fill=\"currentColor\" d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z\"/>",
    "width": 24,
    "height": 24
  },
  "folder-outline": {
    "body": "<path fill=\"currentColor\" d=\"M20 18H4V8h16m0-2h-8l-2-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2\"/>",
    "width": 24,
    "height": 24
  },
  "folder-multiple-outline": {
    "body": "<path fill=\"currentColor\" d=\"M22 4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6l2 2zM2 6v14h18v2H2a2 2 0 0 1-2-2V6zm4 0v10h16V6z\"/>",
    "width": 24,
    "height": 24
  },
  "phone": {
    "body": "<path fill=\"currentColor\" d=\"M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25c1.12.37 2.32.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z\"/>",
    "width": 24,
    "height": 24
  },
  "email-outline": {
    "body": "<path fill=\"currentColor\" d=\"M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z\"/>",
    "width": 24,
    "height": 24
  },
  "translate": {
    "body": "<path fill=\"currentColor\" d=\"m12.87 15.07l-2.54-2.51l.03-.03A17.5 17.5 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7l1.62-4.33L19.12 17z\"/>",
    "width": 24,
    "height": 24
  },
  "account-switch-outline": {
    "body": "<path fill=\"currentColor\" d=\"M16 9c6 0 6 4 6 4v2h-6v-2s0-1.69-1.15-3.2c-.17-.23-.38-.45-.6-.66C14.77 9.06 15.34 9 16 9m-8 2c3.5 0 3.94 1.56 4 2H4c.06-.44.5-2 4-2m0-2c-6 0-6 4-6 4v2h12v-2s0-4-6-4m1 8v2h6v-2l3 3l-3 3v-2H9v2l-3-3zM8 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0-2C6.34 1 5 2.34 5 4s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m8 0c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3\"/>",
    "width": 24,
    "height": 24
  },
  "bell-outline": {
    "body": "<path fill=\"currentColor\" d=\"M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2m11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6zm-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10z\"/>",
    "width": 24,
    "height": 24
  },
  "close": {
    "body": "<path fill=\"currentColor\" d=\"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\"/>",
    "width": 24,
    "height": 24
  },
  "check-circle-outline": {
    "body": "<path fill=\"currentColor\" d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8z\"/>",
    "width": 24,
    "height": 24
  },
  "check-circle": {
    "body": "<path fill=\"currentColor\" d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"/>",
    "width": 24,
    "height": 24
  },
  "close-circle-outline": {
    "body": "<path fill=\"currentColor\" d=\"M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z\"/>",
    "width": 24,
    "height": 24
  },
  "magnify": {
    "body": "<path fill=\"currentColor\" d=\"M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5\"/>",
    "width": 24,
    "height": 24
  },
  "table-large": {
    "body": "<path fill=\"currentColor\" d=\"M4 3h16a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 4v3h4V7zm6 0v3h4V7zm10 3V7h-4v3zM4 12v3h4v-3zm0 8h4v-3H4zm6-8v3h4v-3zm0 8h4v-3h-4zm10 0v-3h-4v3zm0-8h-4v3h4z\"/>",
    "width": 24,
    "height": 24
  },
  "view-column-outline": {
    "body": "<path fill=\"currentColor\" d=\"M4 5v13h17V5zm10 2v9h-3V7zM6 7h3v9H6zm13 9h-3V7h3z\"/>",
    "width": 24,
    "height": 24
  },
  "calendar-month-outline": {
    "body": "<path fill=\"currentColor\" d=\"M7 11h2v2H7zm14-6v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2M5 7h14V5H5zm14 12V9H5v10zm-4-6v-2h2v2zm-4 0v-2h2v2zm-4 2h2v2H7zm8 2v-2h2v2zm-4 0v-2h2v2z\"/>",
    "width": 24,
    "height": 24
  },
  "filter-variant": {
    "body": "<path fill=\"currentColor\" d=\"M6 13h12v-2H6M3 6v2h18V6M10 18h4v-2h-4z\"/>",
    "width": 24,
    "height": 24
  },
  "comment-text-outline": {
    "body": "<path fill=\"currentColor\" d=\"M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L13.08 16H20V4H4v12zM6 7h12v2H6zm0 4h9v2H6z\"/>",
    "width": 24,
    "height": 24
  },
  "message-outline": {
    "body": "<path fill=\"currentColor\" d=\"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H5.2L4 17.2V4h16z\"/>",
    "width": 24,
    "height": 24
  },
  "account-outline": {
    "body": "<path fill=\"currentColor\" d=\"M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1\"/>",
    "width": 24,
    "height": 24
  },
  "account-circle-outline": {
    "body": "<path fill=\"currentColor\" d=\"M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2M7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.5.88 4.93 1.78A7.9 7.9 0 0 1 12 20c-1.86 0-3.57-.64-4.93-1.72m11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.93 7.93 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.5-1.64 4.83M12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6m0 5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 8a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 11\"/>",
    "width": 24,
    "height": 24
  },
  "arrow-right": {
    "body": "<path fill=\"currentColor\" d=\"M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z\"/>",
    "width": 24,
    "height": 24
  },
  "arrow-left": {
    "body": "<path fill=\"currentColor\" d=\"M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11z\"/>",
    "width": 24,
    "height": 24
  },
  "chevron-left": {
    "body": "<path fill=\"currentColor\" d=\"M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z\"/>",
    "width": 24,
    "height": 24
  },
  "chevron-right": {
    "body": "<path fill=\"currentColor\" d=\"M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z\"/>",
    "width": 24,
    "height": 24
  },
  "cloud-upload-outline": {
    "body": "<path fill=\"currentColor\" d=\"M6.5 20q-2.28 0-3.89-1.57Q1 16.85 1 14.58q0-1.95 1.17-3.48q1.18-1.53 3.08-1.95q.63-2.3 2.5-3.72Q9.63 4 12 4q2.93 0 4.96 2.04Q19 8.07 19 11q1.73.2 2.86 1.5q1.14 1.28 1.14 3q0 1.88-1.31 3.19T18.5 20H13q-.82 0-1.41-.59Q11 18.83 11 18v-5.15L9.4 14.4L8 13l4-4l4 4l-1.4 1.4l-1.6-1.55V18h5.5q1.05 0 1.77-.73q.73-.72.73-1.77t-.73-1.77Q19.55 13 18.5 13H17v-2q0-2.07-1.46-3.54Q14.08 6 12 6Q9.93 6 8.46 7.46Q7 8.93 7 11h-.5q-1.45 0-2.47 1.03Q3 13.05 3 14.5T4.03 17q1.02 1 2.47 1H9v2m3-7\"/>",
    "width": 24,
    "height": 24
  },
  "file-document-outline": {
    "body": "<path fill=\"currentColor\" d=\"M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm0 2h7v5h5v11H6zm2 8v2h8v-2zm0 4v2h5v-2z\"/>",
    "width": 24,
    "height": 24
  },
  "delete-outline": {
    "body": "<path fill=\"currentColor\" d=\"M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z\"/>",
    "width": 24,
    "height": 24
  },
  "alert-circle-outline": {
    "body": "<path fill=\"currentColor\" d=\"M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8\"/>",
    "width": 24,
    "height": 24
  },
  "send": {
    "body": "<path fill=\"currentColor\" d=\"m2 21l21-9L2 3v7l15 2l-15 2z\"/>",
    "width": 24,
    "height": 24
  },
  "progress-clock": {
    "body": "<path fill=\"currentColor\" d=\"M13 2.03v2.02c4.39.54 7.5 4.53 6.96 8.92c-.46 3.64-3.32 6.53-6.96 6.96v2c5.5-.55 9.5-5.43 8.95-10.93c-.45-4.75-4.22-8.5-8.95-8.97m-2 .03c-1.95.19-3.81.94-5.33 2.2L7.1 5.74c1.12-.9 2.47-1.48 3.9-1.68zM4.26 5.67A9.9 9.9 0 0 0 2.05 11h2c.19-1.42.75-2.77 1.64-3.9zM2.06 13c.2 1.96.97 3.81 2.21 5.33l1.42-1.43A8 8 0 0 1 4.06 13zm5.04 5.37l-1.43 1.37A10 10 0 0 0 11 22v-2a8 8 0 0 1-3.9-1.63M12.5 7v5.25l4.5 2.67l-.75 1.23L11 13V7z\"/>",
    "width": 24,
    "height": 24
  },
  "file-eye-outline": {
    "body": "<path fill=\"currentColor\" d=\"M17 18c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5M9.27 20H6V4h7v5h5v4.07c.7.08 1.36.25 2 .49V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.5a8.2 8.2 0 0 1-1.23-2\"/>",
    "width": 24,
    "height": 24
  },
  "flag-outline": {
    "body": "<path fill=\"currentColor\" d=\"m12.36 6l.4 2H18v6h-3.36l-.4-2H7V6zM14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6\"/>",
    "width": 24,
    "height": 24
  },
  "tag-outline": {
    "body": "<path fill=\"currentColor\" d=\"m21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M13 20l-9-9V4h7l9 9M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5\"/>",
    "width": 24,
    "height": 24
  }
};

export function setupIcons(): void {
  for (const [name, iconData] of Object.entries(MDI_ICONS)) {
    addIcon(`mdi:${name}`, iconData);
  }
}
