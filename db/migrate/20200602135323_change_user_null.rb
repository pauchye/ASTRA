class ChangeUserNull < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :last_name, true
    change_column_null :users, :first_name, true
    change_column_null :users, :email, true
  end
end
