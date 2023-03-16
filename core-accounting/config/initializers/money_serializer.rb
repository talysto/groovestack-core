class Money
  def as_json(*)
    {
      amount: to_s,
      formatted_amount: format,
      currency: {
        code: currency.iso_code,
        symbol: currency.symbol
      }
    }
  end
end