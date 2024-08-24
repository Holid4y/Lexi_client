import React from "react";
import { useSelector } from "react-redux";

import { isActivatedEmail } from "../../utils/utils";

import EmailWarning from "./email/EmailWarning";
import ChangeEmailButton from "./email/ChangeEmailButton";
import ChangePasswordButton from "./ChangePasswordButton"
import ExitButton from "./ExitButton";

function SecurityTab() {
    const { activated_email } = useSelector((state) => state.user);
    
    return (
        <div className="tab-pane fade my-4" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
            {isActivatedEmail(activated_email) ? (
                ""
            ) : (
                <EmailWarning />
            )}

            <ChangePasswordButton />
            <ChangeEmailButton />
            <ExitButton />
            
        </div>
    );
}

export default SecurityTab;
