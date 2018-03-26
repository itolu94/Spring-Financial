package com.spring.financial.auth;

import org.mindrot.jbcrypt.BCrypt;

public class HashManager {

    static public String hashpw(String password) {
        String hashed = BCrypt.hashpw(password,BCrypt.gensalt());
        return hashed;
    }

    static public String hashpw(String password, int rounds) {
        String hashed = BCrypt.hashpw(password,BCrypt.gensalt(rounds));
        return hashed;
    }

    static public Boolean checkpw(String candidate,String hash) {
        if(BCrypt.checkpw(candidate,hash))
            return true;
        else
            return false;
    }
}
