CREATE MIGRATION m1pyzqbzuc5azoc45ujcxsxvstv6do645hjf6tqwnz3de7mbelbs3a
    ONTO m1wphq5rtfbxuymsou3ziqgzgprsqnryv4msah2qiot5yhcvoluwdq
{
  ALTER TYPE default::Room {
      CREATE MULTI LINK players: default::User {
          CREATE PROPERTY username: std::str;
          CREATE PROPERTY winner: std::bool {
              SET default := false;
          };
      };
  };
  ALTER TYPE default::User {
      DROP LINK rooms;
  };
};
