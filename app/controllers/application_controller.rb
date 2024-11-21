class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :full_name])
  end

  def after_sign_in_path_for(resource)
    "http://localhost:3000" # Redirect to your React app after sign in for Devise
  end
end
