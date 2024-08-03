import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSettings } from "../../common/reducers/userSlice";

import Loading from "../../common/components/Treatment/Loading";
import Header from "./components/Header";
import UserName from "./components/head/UserName";
import UserEmail from "./components/head/UserEmail";
import NavButton from "./components/head/NavButton";
// import ButtonLink from "./components/head/ButtonLink";

import Form from "./components/form/Form";
import SecurityTab from "./components/security/SecurityTab";

// import Avatar from "./components/head/avatar/Avatar";
// import AvatarModal from "./components/head/avatar/AvatarModal";

function Profile() {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.user);

    const [hasChanges, setHasChanges] = useState(false);
    const [dataToSave, setDataToSave] = useState(null);

    useEffect(() => {
        dispatch(fetchSettings());
    }, []);

    return (
        <div className="align-items-center">
            <Header hasChanges={hasChanges} dataToSave={dataToSave} />
            {loading ? (
                <Loading />
            ) : (
                <div className="container pb-5">
                    <div className="row g-4 mb-4 align-items-stretch">
                        {/* <Avatar /> */}
                        <div className="col-8 col-sm-10">
                            <UserName />
                            <UserEmail />
                        </div>
                        {/* {OptionsAvatar} */}
                    </div>

                    {/* <ButtonLink /> */}
                    <NavButton />

                    <div className="tab-content" id="myTabContent">
                        <Form setHasChanges={setHasChanges} setDataToSave={setDataToSave} />
                        <SecurityTab />
                    </div>

                    {/* <AvatarModal /> */}
                </div>
            )}
        </div>
    );
}

export default Profile;
