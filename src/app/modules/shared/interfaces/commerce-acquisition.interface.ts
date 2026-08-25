export type CommerceAcquisitionOrigin = 'PLATFORM' | 'LEGACY_PAYMENT' | 'LEGACY_GRANT';

export interface CommercePaymentSnapshot {
  origin: CommerceAcquisitionOrigin;
  currencyCode: string | null;
  totalPrice: string | null;
}

/** Returns player-facing payment copy without rendering nullable legacy fields as text. */
export function commercePaymentLabel(snapshot: CommercePaymentSnapshot): string {
  if (snapshot.totalPrice !== null && snapshot.currencyCode !== null) {
    return `${snapshot.totalPrice} ${snapshot.currencyCode}`;
  }
  return snapshot.origin === 'LEGACY_GRANT' ? 'Выдано ранее' : 'Цена не сохранена';
}

/** Describes how one immutable commerce acquisition entered the current platform. */
export function commerceOriginCopy(origin: CommerceAcquisitionOrigin): {label: string; description: string} {
  switch (origin) {
    case 'LEGACY_PAYMENT': return {
      label: 'Перенесённая покупка',
      description: 'Платёж сохранён из старой системы. Текущий кошелёк не списывался повторно.',
    };
    case 'LEGACY_GRANT': return {
      label: 'Перенесённое право',
      description: 'Право восстановлено из старой системы с исходным периодом действия.',
    };
    default: return {
      label: 'Покупка Yurelax',
      description: 'Покупка проведена платформой и связана с подтверждённой финансовой операцией.',
    };
  }
}
