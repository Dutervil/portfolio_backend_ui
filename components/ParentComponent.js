import Aside from "./Aside";
import Header from "./Header";


function ParentComponent(props) {


    return (
        <div>
            <Header handleAsideOpen={props.appAsideClickOpen} />
            <Aside asideOpen={props.appOpen} handleAsideOpen={props.appAsideClickOpen} />
        </div>
    );
}

export default ParentComponent;
