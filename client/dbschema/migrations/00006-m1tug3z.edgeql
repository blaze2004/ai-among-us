CREATE MIGRATION m1tug3z3eriqbeii56xpyofrm3f6hxssyoonmhhtouvzp2ehcvhvyq
    ONTO m1xztrw66aufs7h47inry3hvjqlcqduss5ez4bh7tcbc5u57nrirfq
{
  ALTER TYPE default::RoomUser {
      CREATE REQUIRED PROPERTY username: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
