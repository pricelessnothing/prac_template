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
    const imageURL = this.getImage(body);
    return { meta, imageURL };
  }

  private getMeta(body: FormData): Record<string, string> {
    const res: Record<string, any> = {};
    this.META_KEYS.forEach((metaKey: string) => {
      const data = body.get(metaKey);
      if (data !== null || undefined) {
        if (metaKey === 'frameTime' || metaKey === 'frameGrabTime') {
          const date = new Date(Number(data));
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          res[metaKey] = `${hours}:${minutes}:${seconds}`;
        } else {
          res[metaKey] = data;
        }
      } else {
        throw new Error('Bad metadata');
      }
    });
    return res;
  }

  private getImage(body: FormData): string {
    const imageData = body.get('data');
    if (imageData !== null) {
      return window.URL.createObjectURL(new Blob([imageData], { type: 'image/jpeg' }));
    }
    throw new Error('Bad image');
  }
}

export const camerasService = new CamerasService();
