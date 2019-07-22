class Properties {
  public endPoint = process.env.AAT_URL ? process.env.AAT_URL : 'http://localhost:4200';
}

export let apiProps = new Properties();
