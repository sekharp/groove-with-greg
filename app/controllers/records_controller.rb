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

	# POST /records
	def create
		record = Record.new(record_params)

    if record.save
      render json: record, status: :created
    else
      render json: record,
						 status: :unprocessable_entity
		end
	end

	private

	def record_params
    params.permit(:title, :artist, :year, :condition)
  end
end
