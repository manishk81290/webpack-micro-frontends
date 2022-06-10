import './Header.scss';
class Header{
    render(text="",mode='none'){
        const h1=document.createElement('h1');
        h1.innerHTML=text+' - ' + mode;
        const body=document.querySelector('body');
        body.appendChild(h1);
    }
}

export default Header;