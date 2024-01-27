import abi from '/public/config/abi.json' assert { type: "json" }
import styles from 'styles/container_mint.module.css'
import Loading from 'components/loading'
import { parseEther } from 'viem'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useState, useEffect } from 'react'

export default function ContainerMint() {
    const [mintAmount, setMintAmount] = useState(1)
    const [mintCost, setMintCost] = useState(1)

    const changeMintAmountHandler = (count) => {
        if (mintAmount + count < 1) setMintAmount(1);
        else if (mintAmount + count > 99) setMintAmount(99);
        else setMintAmount((prevState) => prevState + count);
    }

    const { config } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'mint',
        value: parseEther(`${mintCost}`),
        args: [mintAmount],
        gas: 1_000_000n,
    });
    const { data: mintData, isSuccess, isError, write } = useContractWrite(config);
    const { isLoading } = useWaitForTransaction({
        hash: mintData?.hash,
    });

    useEffect(() => {
        setMintCost(1 * mintAmount);
    }, [mintAmount]);

    return (
        <div className={styles.container_mint}>
            <div className={styles.spacer} />

            <div className={styles.block_price}>
                [ 1MATIC/1NFT ]
            </div>

            <div className={styles.block_counter}>
                <div className={styles.countdown} onClick={() => {changeMintAmountHandler(-5)}}>-5</div>
                <div className={styles.countdown} onClick={() => {changeMintAmountHandler(-1)}}>-1</div>
                <div className={styles.counter}>{mintAmount}</div>
                <div className={styles.countup} onClick={() => {changeMintAmountHandler(1)}}>+1</div>
                <div className={styles.countup} onClick={() => {changeMintAmountHandler(5)}}>+5</div>
            </div>

            <div className={styles.block_operate_mint}>
                {!mintData && !isLoading && !isError &&
                    <button
                        className={styles.button_mint}
                        disabled={!write || isSuccess}
                        onClick={() => {
                            write?.()
                        }}
                    >
                        Mint
                    </button>
                }
                {isLoading &&
                    <div className={styles.loading}>
                        <Loading />
                    </div>
                }
                {mintData && !isLoading && !isError && isSuccess &&
                    <div className={styles.notice_success}>
                        <p>ミントに成功しました！</p>
                        <p><a href='https://opensea.io/ja/account'>マイコレクションを確認する</a></p>
                    </div>
                }
                {isError &&
                    <div className={styles.notice_failure}>
                        <p>ミントに失敗しました。</p>
                        <p>再度更新してからご試行ください。</p>
                    </div>
                }
            </div>

            <div className={styles.spacer} />
        </div>
    )
}