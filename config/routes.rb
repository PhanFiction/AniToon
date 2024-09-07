Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  root 'homepage#index'

  namespace :api do
    resources :bookmarks, only: [:index, :create, :destroy]

    scope '/anime' do
      get 'episodes/:id', to: 'animes#episodes'
    end

    resources :animes, path: 'anime', only: [:index] do
      collection do
        get 'info'
        get 'search'
        get 'genre'
        get 'category'
        get 'episode'
      end
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
