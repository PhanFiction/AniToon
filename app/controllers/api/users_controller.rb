class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def user_signed_in
    render json: current_user
  end
end
