CREATE MIGRATION m1yfgdjmx7kt5srvedaymp5rbgkdddrqwj3qp7u4iwckvpel42yfva
    ONTO m1aldjjjtw5zar42ajkgwdpv73ckjrac6c3yrwmbxtfwx4vtfua3fa
{
  CREATE TYPE default::Game {
      CREATE REQUIRED LINK winner: default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY winnerId := (.winner.id);
      CREATE PROPERTY playedAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::RoomUser {
      CREATE REQUIRED LINK room: default::Game {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY roomId := (.room.id);
      CREATE REQUIRED LINK user: default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
  };
  ALTER TYPE default::User {
      CREATE PROPERTY losses: std::int64 {
          SET default := 0;
      };
      CREATE PROPERTY score: std::int64 {
          SET default := 0;
      };
      CREATE PROPERTY wins: std::int64 {
          SET default := 0;
      };
  };
};
