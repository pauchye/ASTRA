# api_user_routes GET    /api/users/:user_id/routes(.:format)
# api_routes GET    /api/routes(.:format)
#     POST   /api/routes(.:format) 
# new_api_route GET    /api/routes/new(.:format) 
# edit_api_route GET    /api/routes/:id/edit(.:format)
# api_route GET    /api/routes/:id(.:format)
#     PATCH  /api/routes/:id(.:format)
#     PUT    /api/routes/:id(.:format)
#     DELETE /api/routes/:id(.:format)
# api_session DELETE /api/session(.:format)
#     POST   /api/session(.:format)

class Api::RoutesController < ApplicationController

    def index
        if params.has_key?(:user_id)
            # index of nested resource
            @routes = Route.where(user_id: params[:user_id])
        else
            # index of top-level resource
            @routes = Route.all
        end
        render :index
    end

    def show
        @route = Route.find(params[:id])
        render :show
    end

    def create
        # debugger
        @route = Route.new(route_params)
        # debugger
        if @route.save
            render :show
        else
            render json: @route.errors.full_messages, status: 401
        end
    end

    def update
        @route = Route.find(params[:id])
        if @route.save
            render :show
        else
            render json: @route.errors.full_messages, status: 401
        end
    end

    def destroy
        @route = Route.find(params[:id])
        if @route
            destroy(@route)
        else
            render json: ['Could not locate route'], status: 400
        end
    end

    def route_params
        # debugger
        params.require(:route).permit(:route_name, :user_id, :description, :activity, :road_type, :distance, :estimated_duration, :elevation, :route_data)
    end

end