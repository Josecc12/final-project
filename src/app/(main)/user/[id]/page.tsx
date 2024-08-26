
import UserDetail from "../[id]/user-detail";
type props = {
    params: {
        id: number;
    }
}

export default function Page({params}:props){
    return(
        <div className="w-full">
            <UserDetail params= {params}/>
        </div>
    )
}

