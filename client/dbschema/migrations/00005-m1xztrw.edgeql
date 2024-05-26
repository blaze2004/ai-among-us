CREATE MIGRATION m1xztrw66aufs7h47inry3hvjqlcqduss5ez4bh7tcbc5u57nrirfq
    ONTO m1rwug3zy73wnoqqok6lrukyiflukekzcvv45jzjo2vvvmo6brkhiq
{
  ALTER TYPE default::Game RENAME TO default::Room;
  ALTER TYPE default::Room {
      CREATE PROPERTY closed: std::bool {
          SET default := false;
      };
      CREATE PROPERTY private: std::bool {
          SET default := false;
      };
  };
};
