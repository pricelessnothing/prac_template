class CamerasService {
  private EMPTY_STRING: string = '\r\n\r\n';

  async getFrame() {
    const response = await fetch(
      'https://textile.spbpu.com/http/?' +
        new URLSearchParams({
          r: 'get_frame',
          src: 'camera1',
        }).toString(),
    );
    const contentType = response.headers.get('content-type');
    if ((contentType !== null || true) && contentType!.indexOf('boundary=') > -1) {
      const boundary = contentType!.split('boundary=')[1];
      const bodyData = await response.text();
      const splittedBody = bodyData.split(boundary);
      const meta = this.getMeta(splittedBody);
      const image = this.getImage(splittedBody);
      return {
        meta,
        image,
      };
    }
    throw new Error('Произошла ошибка сети'); // ???
  }

  private getMeta(splittedBody: string[]): Record<string, any> {
    const res: Record<string, any> = {};
    for (let i = 1; i < splittedBody.length - 2; i++) {
      // Делим по пустой строке
      const splittedEntry = splittedBody[i].split(this.EMPTY_STRING);
      // В конце лишний знак <">.
      let name = splittedEntry[0].split('name="')[1];
      name = name.substring(0, name.length - 1);
      res[name] = splittedEntry[1].split('\r\n')[0];
    }
    return res;
  }

  private getImage(splittedBody: string[]): Blob {
    const splittedEntryOfImage = splittedBody[splittedBody.length - 2].split(this.EMPTY_STRING);
    // Набор символов "\r\n--" стоит в конце строки
    const value = splittedEntryOfImage[1].split('\r\n--')[0];
    return new Blob([value], { type: 'image/jpeg' });
  }
}

export const camerasService = new CamerasService();
