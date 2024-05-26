module default {
    type User {
        property name -> str;
        required property email -> str {
            constraint exclusive;
        }
        property emailVerified -> datetime;
        property image -> str;
        multi link accounts := .<user[is Account];
        multi link sessions := .<user[is Session];
        property createdAt -> datetime {
            default := datetime_current();
        };
        property score -> int64 {
            default := 0;
        };
        property wins -> int64 {
            default := 0;
        };
        property losses -> int64 {
            default := 0;
        };
    }
 
    type Account {
       required property userId := .user.id;
       required property type -> str;
       required property provider -> str;
       required property providerAccountId -> str {
        constraint exclusive;
       };
       property refresh_token -> str;
       property access_token -> str;
       property expires_at -> int64;
       property token_type -> str;
       property scope -> str;
       property id_token -> str;
       property session_state -> str;
       required link user -> User {
            on target delete delete source;
       };
       property createdAt -> datetime {
            default := datetime_current();
        };
 
       constraint exclusive on ((.provider, .providerAccountId))
    }
 
    type Session {
        required property sessionToken -> str {
            constraint exclusive;
        }
        required property userId := .user.id;
        required property expires -> datetime;
        required link user -> User {
            on target delete delete source;
        };
        property createdAt -> datetime {
            default := datetime_current();
        };
    }
 
    type VerificationToken {
        required property identifier -> str;
        required property token -> str {
            constraint exclusive;
        }
        required property expires -> datetime;
        property createdAt -> datetime {
            default := datetime_current();
        };
 
        constraint exclusive on ((.identifier, .token))
    }

    type RoomUser {
        required property roomId := .room.id;
        required property userId := .user.id;
        required property winner -> bool {
            default := false;
        }
        required property username -> str;
        required link room -> Room {
            on target delete delete source;
        };
        required link user -> User {
            on target delete delete source;
        };
    }

    type Room {
        required property name -> str;
        property playedAt -> datetime {
            default := datetime_current();
        };
        property closed -> bool {
            default := false;
        };
        property private -> bool {
            default := false;
        };
    }
}
 
# Disable the application of access policies within access policies
# themselves. This behavior will become the default in EdgeDB 3.0.
# See: https://www.edgedb.com/docs/reference/ddl/access_policies#nonrecursive
using future nonrecursive_access_policies;