import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import {IOS, platform} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";

// import persik from '../img/persik.png';
const osName = platform();

const QrCode = props => {
	const [msg, setMsg] = useState(null);
    const scan = () => {
        console.log('click scan:')
		bridge.send("VKWebAppOpenCodeReader", {})
			.then(data => {
				// Обработка события в случае успеха
				console.log(data);
				setMsg('data: ' + data.code_data)
			})
			.catch(error => {
				console.log('error:', error)
				setMsg('error: ' + error.error_data.error_reason)
			});
    };
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={props.go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                QrCode
            </PanelHeader>
            <Group title="Navigation Example">
                <Div>
                    <Button size="xl" mode="outline" level="2" onClick={scan} data-to="qrCode">
                        scan
                    </Button>
                </Div>
            </Group>
			<Div>
				<Text weight="regular" style={{ marginBottom: 16 }}>{msg}</Text>
			</Div>
        </Panel>
    )
};

QrCode.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default QrCode;
