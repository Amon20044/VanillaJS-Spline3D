import { Application } from '@splinetool/runtime';

window.onload = () => {
  const canvas = document.getElementById('canvas3d');
  const app = new Application(canvas);
  app.load('https://prod.spline.design/no2TF-PIICSPnVho/scene.splinecode');
};
