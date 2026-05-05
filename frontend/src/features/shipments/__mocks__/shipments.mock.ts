import { Shipment, ShipmentDetails } from "../types/shipments.types";

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    trackingNumber: "WMS-7BEB35F22A84",
    recipient: "Bomba",
    weight: 50,
    status: "DELIVERED",
  },
  {
    trackingNumber: "WMS-613DA33D5B47",
    recipient: "Flurby Linux",
    weight: 120,
    status: "CANCELLED",
  },
  {
    trackingNumber: "WMS-E7C34AD7DB89",
    recipient: "Jan Kowalski",
    weight: 54,
    status: "DELIVERED",
  },
];

export const MOCK_DETAILS: Record<string, ShipmentDetails> = {
  "WMS-7BEB35F22A84": {
    id: "3a5621ad-216a-4899-b12f-e0606fb7bd8a",
    trackingNumber: "WMS-7BEB35F22A84",
    recipient: "Bomba",
    weight: 50,
    status: "DELIVERED",
    createdAt: "2026-05-05T18:57:42.696Z",
    updatedAt: "2026-05-05T18:59:00.103Z",
    events: [
      {
        id: "d998859e-62cd-43ea-8a5a-39d497f0ab52",
        status: "DELIVERED",
        description: "Paczka została doręczona do odbiorcy!",
        createdAt: "2026-05-05T18:59:00.147Z",
      },
      {
        id: "de131cd8-4fcd-4eaa-80ea-3e48d2b193ee",
        status: "IN_TRANSIT",
        description: "Paczka opuściła magazyn główny",
        createdAt: "2026-05-05T18:58:00.436Z",
      },
      {
        id: "5af39b76-7fd3-4457-8507-d3c5c64fa46d",
        status: "PENDING",
        description: "Paczka została utworzona i zarejestrowana w systemie WMS",
        createdAt: "2026-05-05T18:57:42.696Z",
      },
    ],
  },
  "WMS-613DA33D5B47": {
    id: "84217b52-6fc5-4012-b722-85594be1ba69",
    trackingNumber: "WMS-613DA33D5B47",
    recipient: "Flurby Linux",
    weight: 120,
    status: "CANCELLED",
    createdAt: "2026-05-05T18:52:08.822Z",
    updatedAt: "2026-05-05T18:52:12.958Z",
    events: [
      {
        id: "8ff52aab-27b6-4f3c-ba79-49f7ab56a47f",
        status: "CANCELLED",
        description: "Przesyłka została anulowana przez klienta.",
        createdAt: "2026-05-05T18:52:12.958Z",
      },
      {
        id: "dca07357-b860-4a9d-8de9-b8373dc8880c",
        status: "PENDING",
        description: "Paczka została utworzona i zarejestrowana w systemie WMS",
        createdAt: "2026-05-05T18:52:08.822Z",
      },
    ],
  },
  "WMS-E7C34AD7DB89": {
    id: "171fda0c-710b-4966-aeb4-2562420ca61c",
    trackingNumber: "WMS-E7C34AD7DB89",
    recipient: "Jan Kowalski",
    weight: 54,
    status: "DELIVERED",
    createdAt: "2026-05-05T18:51:41.022Z",
    updatedAt: "2026-05-05T18:53:00.391Z",
    events: [
      {
        id: "5b0dd11f-d9a9-45e4-b795-7da2f16ad8f2",
        status: "DELIVERED",
        description: "Paczka została doręczona do odbiorcy!",
        createdAt: "2026-05-05T18:53:00.437Z",
      },
      {
        id: "7adae872-adbe-4acd-9798-813a66230427",
        status: "IN_TRANSIT",
        description: "Paczka opuściła magazyn główny",
        createdAt: "2026-05-05T18:52:00.469Z",
      },
      {
        id: "fbc80acf-54df-4777-86b2-c2c7eeb19aae",
        status: "PENDING",
        description: "Paczka została utworzona i zarejestrowana w systemie WMS",
        createdAt: "2026-05-05T18:51:41.022Z",
      },
    ],
  },
};