import React, {CSSProperties} from 'react';

export interface Param {
    id: number;
    name: string;
    type?: string;
}

interface ParamValue {
    paramId: number;
    value: string;
}

type Color = CSSProperties['color'];

export interface Model {
    paramValues: ParamValue[];
    colors?: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface StateValues { [paramId: number]: string }

interface State {
    stateValues: StateValues
}

export class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const stateValues: StateValues = {};
        props.model.paramValues.forEach(({ paramId, value }) => {
            stateValues[paramId] = value;
        });
        props.params.forEach((param) => {
            if (!Object.hasOwn(stateValues, param.id)) {
                stateValues[param.id] = '';
            }
        });
        this.state = {
            stateValues,
        };
    }

    public getModel(): Model {
        const { colors } = this.props.model;
        const updatedParamValues: ParamValue[] = Object.entries(this.state.stateValues).map(([key, value]) => ({
            paramId: Number(key),
            value: value,
        }));

        return {
            paramValues: updatedParamValues,
            colors: colors,
        };
    }

    private handleChange = (paramId: number, value: string) => {
        this.setState((prevState) => ({
            stateValues: {
                ...prevState.stateValues,
                [paramId]: value,
            },
        }));
    };

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}
            >
                {this.props.params.map((param) => {
                    const htmlId = `${param.id}${param.name}`;
                    return (
                        <div
                            key={param.id}
                            style={{
                                display: 'flex',
                                gap: '10px',
                            }}
                        >
                            <label
                                style={{display: 'block'}}
                                htmlFor={htmlId}
                            >{param.name}:</label>
                            <input
                                id={htmlId}
                                type={param.type ?? "text"}
                                value={this.state.stateValues[param.id] || ''}
                                onChange={(e) => this.handleChange(param.id, e.target.value)}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}
