import Peacock from './peacock-feather.jpeg';
import altText from './alt-text.txt';
function addImage(){
    const img=document.createElement('img');
    img.alt=altText;//"Peacock-Feather-Image";
    img.width=300;
    img.height=700;
    img.src=Peacock;
    const body=document.querySelector('body');
    body.appendChild(img);
}

export default addImage;