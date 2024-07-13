export default function UserInput({ onChangeInputProps, userInputProps }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            type="number"
            required
            onChange={(event) =>
              onChangeInputProps("initialInvestment", event.target.value)
            }
            value={userInputProps.initialInvestment}
          />
        </p>

        <p>
          <label>Annual Investment</label>
          <input
            type="number"
            required
            onChange={(event) =>
              onChangeInputProps("annualInvestment", event.target.value)
            }
            value={userInputProps.annualInvestment}
          />
        </p>
        <p>
          <label>Expect Return</label>
          <input
            type="number"
            required
            onChange={(event) =>
              onChangeInputProps("expectedReturn", event.target.value)
            }
            value={userInputProps.expectedReturn}
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            required
            onChange={(event) =>
              onChangeInputProps("duration", event.target.value)
            }
            value={userInputProps.duration}
          />
        </p>
      </div>
    </section>
  );
}
