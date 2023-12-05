class Price {
  readonly count: number;
  readonly currency: string;
}

export class PresetCard {
  readonly _id: string;
  readonly name: string;
  readonly desc: string;
  readonly image: string;
  readonly rating: number;
  readonly price: Price;
}
