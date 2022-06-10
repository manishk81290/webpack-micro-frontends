import $ from 'jquery';
import './Header.scss';
class Header{
    render(text="",mode='none'){
        //JS CODE
        // const h1=document.createElement('h1');
        // h1.innerHTML=text+' - ' + mode;
        // const body=document.querySelector('body');
        // body.appendChild(h1);

        //JQUERY CODE
        const h1=$('<h1>');
        h1.text(text+' - ' + mode+' - using JQUERY');
        const body=$('body');
        body.append(h1);
    }
}

export default Header;