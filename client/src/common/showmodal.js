import CreatePermission from "../components/modals/createpermission"
import CreateUser from "../components/modals/createuser"


export const Showmodal = (props) => {
    return(
        <>
           {props.type === "create-user" && <CreateUser showmodal={props.showmodal} closemodal={props.closemodal} callback={props.callback}/>}
           {props.type === "create-permission" && <CreatePermission showmodal={props.showmodal} closemodal={props.closemodal} callback={props.callback}/>}
        </>
    )
}