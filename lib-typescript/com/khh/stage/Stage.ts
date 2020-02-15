export abstract class Stage {

  private _width = 0;
  private _height = 0;
  private _data: Map<string, any> = new Map<string, any>();

  get data(): Map<string, any> {
    return this._data;
  }

  set data(value: Map<string, any>) {
    this._data = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }
}
