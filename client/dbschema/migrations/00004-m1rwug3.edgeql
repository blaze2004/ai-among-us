CREATE MIGRATION m1rwug3zy73wnoqqok6lrukyiflukekzcvv45jzjo2vvvmo6brkhiq
    ONTO m1g2y5amkx7o3s4mjowobmqug474kztb6y4qng242rhma7qetyiooq
{
  ALTER TYPE default::Game {
      DROP PROPERTY winnerId;
      DROP LINK winner;
  };
  ALTER TYPE default::RoomUser {
      CREATE REQUIRED PROPERTY winner: std::bool {
          SET default := false;
      };
  };
};
