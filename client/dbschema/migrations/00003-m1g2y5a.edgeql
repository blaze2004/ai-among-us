CREATE MIGRATION m1g2y5amkx7o3s4mjowobmqug474kztb6y4qng242rhma7qetyiooq
    ONTO m1yfgdjmx7kt5srvedaymp5rbgkdddrqwj3qp7u4iwckvpel42yfva
{
  ALTER TYPE default::Game {
      CREATE REQUIRED PROPERTY name: std::str {
          SET REQUIRED USING ('name');
      };
  };
};
