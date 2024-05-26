CREATE MIGRATION m1wphq5rtfbxuymsou3ziqgzgprsqnryv4msah2qiot5yhcvoluwdq
    ONTO m1tug3z3eriqbeii56xpyofrm3f6hxssyoonmhhtouvzp2ehcvhvyq
{
  DROP TYPE default::RoomUser;
  ALTER TYPE default::User {
      CREATE MULTI LINK rooms: default::Room {
          CREATE PROPERTY username: std::str;
          CREATE PROPERTY winner: std::bool {
              SET default := false;
          };
      };
  };
};
