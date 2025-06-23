"use client";

import { useSession } from 'next-auth/react';
import React from 'react';

const UserInfo = () => {
    const session = useSession();
    // console.log(session);
    return (
        <div>
            {
                JSON.stringify(session.data.user.name)
            }
        </div>
    );
};

export default UserInfo;