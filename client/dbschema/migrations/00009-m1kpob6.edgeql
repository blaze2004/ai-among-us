CREATE MIGRATION m1kpob6mahpabhbxfye2fpgcw7vcfnd5kqfnsvpzwubuollqm6z7oa
    ONTO m1pyzqbzuc5azoc45ujcxsxvstv6do645hjf6tqwnz3de7mbelbs3a
{
  ALTER TYPE default::User {
      DROP PROPERTY losses;
      DROP PROPERTY score;
      DROP PROPERTY wins;
  };
};
