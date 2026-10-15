/* Both designs use the same collection, application and sign-in. */
const collectionAssetRoot = new URL('../', location.href);
OBJECTS.forEach(o => { o.imageUrl = new URL(o.imageUrl, collectionAssetRoot).href; });
const sharedLoginShow = window.OC_AUTH.show;
window.OC_AUTH.show = function () {
  sharedLoginShow.call(this);
  document.querySelectorAll('.login-artwork img').forEach(img => {
    img.src = new URL(img.getAttribute('src'), collectionAssetRoot).href;
  });
};
