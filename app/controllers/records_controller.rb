class RecordsController < ApiController
	# GET /records
	def index
		@records = Record.all
		render json: @records.to_json
	end

	# GET /records/:id
	def show
		@record = Record.find(params[:id])
		render json: @record.to_json
	end
end
