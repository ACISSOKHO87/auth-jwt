//import { useEffect } from "react";
import { useParams } from "react-router-dom";
//import { getCurrentUser } from "../apis/auth";

export default function AuthRequire(props: any) {
    //on instancie le navigate pour la redirection
    // const navigate = useNavigate();
    // on récupére les params de la routes demandée
    const params = useParams();

    const Child = props.child;
    //const [redirect, setRedirect] = useState(false);

    // useEffect(() => {
    //     getCurrentUser()
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    return <Child {...props} params={params} />;
}
