class CamerasService {
  META_KEYS: string[] = [
    'sourceName',
    'tag',
    'frameId',
    'frameTime',
    'frameGrabTime',
    'width',
    'height',
    'srcWidth',
    'srcHeight',
    'shutter',
    'gain',
    'temperature',
  ];

  async getFrame() {
    const response = await fetch(
      `https://textile.spbpu.com/http/?${new URLSearchParams({
        r: 'get_frame',
        src: 'camera1',
      }).toString()}`,
    );
    const body = await response.formData();
    const meta = this.getMeta(body);
    const image = this.getImage(body);
    return {
      meta,
      image,
    };
  }

  private getMeta(body: FormData): Record<string, any> {
    const res: Record<string, any> = {};
    for (let i = 0; i < this.META_KEYS.length; i++) {
      const data = body.get(this.META_KEYS[i]);
      if (data !== null || undefined) {
        if (i === 3 || i === 4) {
          res[this.META_KEYS[i]] = this.convertFromUnixTime(new Date(Number(data)));
        } else {
          res[this.META_KEYS[i]] = data;
        }
      } else {
        throw Error('Некорректные метаданные');
      }
    }
    return res;
  }

  private getImage(body: FormData): Blob {
    const imageData = body.get('data');
    if (imageData !== null) {
      return new Blob([imageData], { type: 'image/jpeg' });
    }
    throw Error('Некорректное изображение');
  }

  private convertFromUnixTime(date: Date): string {
    let hours: string;
    let minutes: string;
    let seconds: string;
    if (date.getHours() < 10) {
      hours = `0${date.getHours()}`;
    } else {
      hours = `${date.getHours()}`;
    }
    if (date.getMinutes() < 10) {
      minutes = `0${date.getMinutes()}`;
    } else {
      minutes = `${date.getMinutes()}`;
    }
    if (date.getSeconds() < 10) {
      seconds = `0${date.getSeconds()}`;
    } else {
      seconds = `${date.getSeconds()}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  }
}

export const camerasService = new CamerasService();
