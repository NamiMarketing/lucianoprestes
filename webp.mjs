import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';


(async () => {
  const files = await imagemin(['src/img/*.{jpg,png}'], {
    destination: 'src/img',
    plugins: [
      imageminWebp({ quality: 80 })
    ]
  });

  console.log(files);
})();
