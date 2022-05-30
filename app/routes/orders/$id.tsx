import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createContext, useState } from "react";

interface LoaderProps {
  params: {
    id: string
  }
}

export const loader = ({ params }: LoaderProps) => {
  return json({
    id: params.id,
    name: `Form ${params.id}`
  })
};

type StepKind = "exclusive" | "inclusive" | "textarea";

interface StepType {
  id: string
  text: string
  kind: StepKind,
  nextStep?: StepType
}

interface TextEditableType {
  text: string
  defaultText?: string
  onChange: (text: string) => void
}

const ctx = {
  steps: [],
  callme: (o: unknown) => {
    console.log('ctx', o)
  }
}

const StepsCtx = createContext(ctx)

const Pencil = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
)

export const TextEditable = ({ text, onChange, defaultText = "please edit" }: TextEditableType) => {
  const [isEditable, setIsEditable] = useState(false);
  const klass = isEditable ? 'px-2 py-15 border border-indigo-600 rounded' : ''
  if (!text) {
    return <span onClick={_ => onChange(defaultText)}><Pencil /></span>
  }
  return <span
    className={klass}
    contentEditable={isEditable}
    suppressContentEditableWarning
    onKeyUp={e => {
      if (['Enter'].includes(e.key)) {
        setIsEditable(false)
        onChange(e.currentTarget.innerText.trim())
      }
    }}
    onBlur={e => {
      setIsEditable(false)
      onChange(e.currentTarget.innerText.trim())
    }}
    onClick={e => {
      e.currentTarget.focus()
      setIsEditable(true)
    }}
  >{text}</span>
}

export const capitalize = (s: string) => {
  return s.slice(0, 1).toUpperCase() + s.slice(1)
}

const randomId = () => Math.floor(Math.random() * Date.now() * 1000).toString(36)

const randomStep = (id?: string, text?: string, kind?: "inclusive" | "exclusive"): StepType => ({
  id: id || randomId(),
  text: text || "please edit",
  kind: kind || "inclusive"
})

export const PickType = ({ step, onChange }: StepPropsType) => {
  return <span className="cursor-pointer badge indigo" onClick={_ => {
    const _kinds: StepKind[] = ["inclusive", "exclusive", "textarea"]
    const curIdx = _kinds.indexOf(step.kind)
    const _kind = _kinds[curIdx + 1] || _kinds[0]
    onChange({
      ...step,
      kind: _kind
    })
  }}>{capitalize(step.kind)}</span>
}

interface StepPropsType {
  level?: number
  step: StepType
  onChange: (step?: StepType) => void
}

export const Step = ({ step, level = 0, onChange }: StepPropsType) => {
  return (
    <>
      <div className="flex">
        <div className="flex-initial w-24">{step.id}</div>
        <div className="flex-1">
          <TextEditable
            text={step.text}
            defaultText="Text: please change"
            onChange={text => {
              onChange({
                ...step,
                text
              })
            }} />
        </div>
        <div className="flex-1">
          <PickType step={step} onChange={onChange} />
        </div>
        <div className="flex-1">
          {step.nextStep ? (
            <button
              className="btn-blue small mr-2 w-36"
              onClick={_ => {
                step.nextStep = void 0
                onChange(step)
              }}
            >Remove Child</button>
          ) : (
            <button
              className="btn-blue small mr-2 w-36"
              onClick={_ => {
                step.nextStep = randomStep()
                onChange(step)
              }}
            >Add child</button>
          )}
          <button
            className="btn-blue small w-36"
            onClick={_ => {
              onChange()
            }}
          >Remove this</button>
        </div>
      </div>
      {step.nextStep ? <CreateStep name={step.id} level={level + 1} /> : null}
    </>
  )
}

export const CreateStep = ({ name = "", level = 0 }) => {
  const [title, setTitle] = useState("Title: please change")
  const [steps, setSteps] = useState<StepType[]>([])
  return (
    <StepsCtx.Consumer>
      {ctx => {
        return (
          <div className="p-2 m-2 pr-0 mr-0 border-dotted border-2 rounded-lg">
            <div className="flex">
              <div className="badge indigo cursor-pointer" onClick={_ => {
                const step = randomStep(name + String.fromCharCode(steps.length + 65))
                setSteps(steps.concat(step))
              }}>New step</div>
              <div>
                <TextEditable
                  text={title}
                  defaultText="Title: please change"
                  onChange={text => setTitle(text)}
                />
              </div>
            </div>
            <div className="items">{
              steps.map((step) => {
                return <Step
                  key={`step-${step.id}`}
                  step={step}
                  level={level}
                  onChange={_step => {
                    if (!_step) {
                      setSteps(steps.filter(s => s.id !== step.id))
                    } else {
                      setSteps(steps.map(s => {
                        return s.id === _step.id ? _step : s
                      }))
                    }
                  }}
                />
              })
            }</div>
          </div>
        )
      }}
    </StepsCtx.Consumer>
  )
}

export default function OrderId() {
  const { name } = useLoaderData()
  return (
    <div>
      <h1>{name}</h1>
      <StepsCtx.Provider value={ctx}>
        <CreateStep />
      </StepsCtx.Provider>
      <ul className="link-list">
        <li><Link className="btn-blue" to={`/orders`}>Back</Link></li>
      </ul>
    </div>
  )
}
